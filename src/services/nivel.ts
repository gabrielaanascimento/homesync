
export const nivel = (nivel: string) => {
    let route:string;
    switch (nivel) {
        case "user":
            route = ''
            break
        case "corretor":
            route = ''
            break
        case "imobiliaria":
            route = ''
            break
        default:
            route = '/not-found'
            break;
    }

    return route;
}