import { Injectable } from "@nestjs/common";
import * as nodemailer from "nodemailer";
interface CodeInfo {
    code: string;
    createTime: number
}
@Injectable()
export class VertifyCodeService {
    private codeCacheMap: Map<string, CodeInfo> = new Map()

    async sendMail(to: string[], title: string, message: string) {
        const transporter = nodemailer.createTransport({
            host: "smtp.qq.com",
            port: 465,
            secure: true,
            auth: {
                user: "2363425985@qq.com",
                pass: "ihqnswpobjfveccd",
            },
            tls: {
                rejectUnauthorized: false,
            },
        });
        return new Promise((resolve, reject) => {
            transporter.sendMail({
                from: '"define.wang 验证码 👻" <2363425985@qq.com>', // sender address
                to: to.join(","), // list of receivers
                subject: title, // Subject line
                text: "Hello world?", // plain text body
                html: `
                <div style="padding: 14px;">
                    ${message}
                </div>
                `, // html body
            }, (error, info) => {
                if (error) {
                    reject(error);
                    return
                }
                resolve(info.response)
            });
        })

    }
    setCode(key: string, code: string) {
        this.clear()
        this.codeCacheMap.set(key, {
            code,
            createTime: Date.now()
        })
    }
    getCodeInfo(key: string) {
        return this.codeCacheMap.get(key)
    }

    clear(key?: string) {
        if (key) {
            this.codeCacheMap.delete(key)
            return
        }
        const keys = Array.from(this.codeCacheMap.keys())
        for (let index = 0; index < keys.length; index++) {
            const key = keys[index];
            const value = this.codeCacheMap.get(key)
            if (Date.now() - (value?.createTime || 0) > 5 * 60 * 30) {
                this.codeCacheMap.delete(key)
            }
        }
    }

    createVertifyCode() {
        return (Math.random() * 10000).toFixed().padStart(4, "0")
    }

} 