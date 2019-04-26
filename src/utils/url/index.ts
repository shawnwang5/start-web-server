export class UrlUtils {
    static getValue (url: string, paramName: string): string {
        if (url.startsWith('?')) {
            url = url.substring(1)
        }
        const reg = new RegExp("(^|&)" + paramName + "=([^&]*)(&|$)", 'i')
        const result = url.match(reg)
        if (result != null) {
            return decodeURIComponent(result[ 2 ])
        } else {
            return ''
        }
    }

    static stringify (paramObj: any): string {
        return Object.keys(paramObj).map((key: string) => `${key}=${paramObj[ key ]}`).join('&')
    }
}
