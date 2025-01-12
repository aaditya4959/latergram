export function random(len: number): string{
    let options = "abcdefghijklmnoprstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let ans = "";

    for(let i = 0 ; i<len ; i++){
        ans += options.charAt(Math.floor(Math.random() * options.length));
    }

    return ans;
}