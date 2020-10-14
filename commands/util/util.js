const prefix = process.env.PREFIX;

export function checkValid(message) {
    switch (message) {
        case `${prefix}ping`:
            return true;
    }
}
export function ping(message) {
    let ping = Date.now() - message.createdTimestamp + ' ms';
    return "Your ping is " + `${ping}`;

}
