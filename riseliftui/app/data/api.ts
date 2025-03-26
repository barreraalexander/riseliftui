const myFunc = async (arg1: any, arg2: any): Promise<any> => {
    return "This can be anything";

};

// export const loginUser: (formData: any) => Promise<any> = async () => {
//     // Asynchronous operations here
//     // ...
//     const result = "ge"

//     return result as string;
//   };


export const loginUser = async (formData: any): Promise<any> => {
    const api_url = process.env.NEXT_PUBLIC_BASE_URL;

    const response = await fetch(`${api_url}/login`, {
        method: 'POST',
        body: formData,
    })

    const data = await response.json()
    
    return new Promise<string>((resolve) => {
        resolve(data)

    });
    
};

export const registerUser = async (formData: any): Promise<any> => {
    const api_url = process.env.NEXT_PUBLIC_BASE_URL;

    const response = await fetch(`${api_url}/login`, {
        method: 'POST',
        body: formData,
    })

    const data = await response.json()
    
    return new Promise<string>((resolve) => {
        resolve(data)

    });
    
};

export const get_user_dashboard_const_data = async (): Promise<any> => {
    const api_url = process.env.NEXT_PUBLIC_BASE_URL;

    const response = await fetch(`${api_url}/const_page_data/get_user_dashboard_const_data`, {
        method: 'GET',
        // body: formData,
    })

    const data = await response.json()
    
    console.log(data)

    return new Promise<string>((resolve) => {
        resolve(data)

    });
    
};

// export const resolveAfterDelay = (delay: number): Promise<string> => {
//     return new Promise<string>((resolve) => {
//         setTimeout(() => {


//         resolve(`Resolved after ${delay}ms`);
//         }, delay);
//     });

// };