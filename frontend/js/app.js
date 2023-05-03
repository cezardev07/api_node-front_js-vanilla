import { endPointApi , get } from "./get-api/api.js"

export const app = () => {

    const main = document.querySelector("main")
    const inp = document.querySelector("input")
    
    const use = async () => {
        const data = await get()
        createdElementDom(data)
    }
    
    inp.onchange = () => {
        fetch(endPointApi,{
            method:"POST",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify({menssagem:inp.value})
        })
        inp.value = ""
        
        const created_post = document.querySelector(".created-post")
        created_post.classList.add("close")
        
        removeArticleBefore()

        setTimeout(() => {
            use()
        },100)
    }

    function createdElementDom (params){
        params.forEach(itemDB => {
            const {id,menssagem} = itemDB
            const article = document.createElement("article")
            article.id = id
            article.innerHTML = `
                <div class="header-perfil">
                    <div class="perfil">
                        <img src="./assets/img-perfil.jpg" alt="">
                        <p>first name</p>
                    </div>
                    <div class="btn">
                        <button class="delete">apagar post</button>
                    </div>
                </div>
                <div class="commit-post">
                    <p>${menssagem}</p>
                </div>
            `
            main.appendChild(article)
        })
        deleteElement()
    }
    
    function deleteElement() {
        const btns = document.querySelectorAll(".delete")
        btns.forEach(btn => {
            btn.onclick = () => {
                removeArticleBefore()
                const {id} = btn.parentElement.parentElement.parentElement
                
                fetch(endPointApi + id,{
                    method:"DELETE"
                })
                
                setTimeout(() => {
                    use()
                },100)
            }
            
        })
    }
    
    function removeArticleBefore(){
        const articles = document.querySelectorAll("article")
        articles.forEach(article => {
            article.remove()
        })
    }

    use()
}

//app()