'use server'
 
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';
 

export async function create_cookie(token: string) {
  const cookieStore = await cookies()
 

  cookieStore.set({
    name: 'bearer_token',
    value: token,
    httpOnly: true,
    path: '/',
  })
}

export async function get_cookie(name: string) {
    const cookieStore = await cookies()

    const token = cookieStore.get(name)

    const api_url = process.env.NEXT_PUBLIC_BASE_URL;

    if (token){
        const response = await fetch(`${api_url}/check_key`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token.value}`,
                'Content-Type': 'application/json'
                }
        })

        const data = await response.json()
        console.log(data)
        
        if (response.ok){
            return token

        } else {
            redirect('/signup')

        }


    }






  // should i test if the cookie still works here? 

  return token
  // cookieStore.set({
  //   name: 'bearer_token',
  //   value: token,
  //   httpOnly: true,
  //   path: '/',
  // })
}

export async function validate_token(name: string) {
  const cookieStore = await cookies()
 
  const token = cookieStore.get(name)

  return token
  // cookieStore.set({
  //   name: 'bearer_token',
  //   value: token,
  //   httpOnly: true,
  //   path: '/',
  // })
}



// 'use server';

// import { cookies } from 'next/headers';

// export default async function setCookie(name, value, options = {}) {
//   const response = new Response();
//   cookies().set(name, value, options);
//   return response;
// };