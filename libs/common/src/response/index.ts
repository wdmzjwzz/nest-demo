interface Res {
    code: number,
    data: any
}
export class SuccessResponse<T> implements Res {
    code = 0;
    data: T;
    constructor(data: T) {
        this.data = data
    }
}
export class ErrorResponse<T> implements Res {
    code = 1;
    data: T;
    constructor(data: T) {
        this.data = data
    }
}