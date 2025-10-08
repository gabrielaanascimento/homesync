
export const loginGoogle = (email: string) => {
    if(!email) {
        return { success: false, mensage: "Email é obrigatório" }
    }

    try {
        
        fetch(`${process.env.URL_API}/auth/loginGoogle`, {
            method: "POST",
            headers: {
                
            }
        })

    } catch (error) {
        
    }
}