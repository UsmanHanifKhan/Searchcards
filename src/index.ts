const getUsername = document.querySelector('#user') as HTMLInputElement;
const formSubmit = document.querySelector('#form') as HTMLFormElement;
const main_conatiner = document.querySelector('.main-conatiner') as HTMLElement;

 interface UserData {
    id: number;
    login: string;
    location:DOMStringList;
    url:string;
    avatar_url: string
 }


async function myCustomFetch<T>(url:string , option?: RequestInit): Promise<T> {
    const reponse = await fetch(url , option);

    if(!Response){
        throw new Error(`networl issue ${reponse.status}`)
    }
    const data = reponse.json()
    console.log(data)
    return data
 }


 const showResultUI = (singleUser : UserData)=>{
    const { avatar_url , login , url , location} = singleUser
    main_conatiner.insertAdjacentHTML(
        'beforeend',
    `<div class='card'>
    <img src=${avatar_url} alt=${login} />
    <hr/>
    <div class='card-footer'>
    <img src=${avatar_url} alt=${login} />
    <a href='${url}'> Github </a>
    </div>
    </div>
    `
    )
 }


function fetchData(url :string) {
    myCustomFetch<UserData[]>(url , {}).then((userInfo)=>{
        for(const singleUser of userInfo){
            showResultUI(singleUser)
        }
    })

} 

fetchData('http://api.github.com/users')

formSubmit.addEventListener('submit' ,  async (e)=>{
    e.preventDefault()
    const searchTerm = getUsername.value.toLowerCase()
    try {
        const url = 'https://api.github.com/users'

        const allUser = await  myCustomFetch<UserData[]>(url , {})
        const matchUsers = allUser.filter((user)=> {
            return user.login.toLowerCase().includes(searchTerm)
        })

        main_conatiner.innerHTML = '';

        if(matchUsers.length === 0){
            main_conatiner?.insertAdjacentHTML(
                'beforeend',
                `<p> No matching users found.</p>`
            )
        }
        else{
            for(const singleUser of matchUsers){
                showResultUI(singleUser)
            }
        }
    } catch (error) {
        console.log(error)
    }
})