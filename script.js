// should be in constant file
const BASE_URL = "https://cdn.shopify.com"

const IMAGE_URL1 = "https://s3-alpha-sig.figma.com/img/d636/7d6d/f34ce14e7187edeeb026d73413e4a29c?Expires=1707696000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=njJnEBvVkbZBbB96xUby~DGnCG-ea~Guc3cf5C~nOR4ab-mJpfzhDqvLuHeRy1gd8t-Ty8pLGdt5sjYnRYZ9~nminOG-JHBkGPfHKdA7gkdZs8gl1-LyycPWQWN5qVPJiIFeQrKTcVIs4xOvjBdM6qojq1AyZIL3DWE438oPKpX-oyySlwqMo7rQS1ItTpt478WDXHXBE8I8WCmH0cU5a9JB697sq8GU5jrwWuRv321j9lmCxb5Ndvg3S-otqjxc~PkFZRyJABsokBdipQMpD06-TQsAzsv04OrVxJ1qvnfcadsjp9HxB5kD6~okcjILic9bSeu6M1wfjqRUHKe2Yw__"

const IMAGE_URL2 = "https://s3-alpha-sig.figma.com/img/2b85/4ec0/815f49c8ce3ddd231e2da63ce0596dc4?Expires=1707696000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=XRH9cqSWOhhPvbHMTBP~BPS64PEQXGgRh4tw~~RjjmU4f7nSgJ9WO9QdK5gykQdkDmURcVo3TN5Aijd0W6IAXDSHucAt~yMahS~Rq1O-QW56kX3x8RyjFwBW1XeNCYjr6xiEhCObV0DIm3lj8mJabmHEJAyeyPLt21fCOZVLfcM6N4ea~YxQDF-0ZPY3MGYMXEf3~05yfVuuWUhx9UREbP3dYgINOJpK1LYTE3oUuqcq0F1o9mXSnPra5S6t9-UvLoHSr8VdD26n6YmouxxDHmu7yjNiuA3i27jzwjzaPrjd7VSNCvKayg~u9JLLJpSUJ~1W8qk~~imOxYlgvoGL5w__"

const IMAGE_URL3 = "https://s3-alpha-sig.figma.com/img/7f07/20f0/38539658df252c621f52c64231e8986a?Expires=1707696000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=p426R-q3n6f7MVTQwyG27Vo-MHtuMrwYTkMRgHggv-hJLTmyliihLN61ZugAvVLuD9SOOUdc0BEP8Pbjyz~D7cJ53Zd4Ig75gDZPeizhoDIRl96Ivz-l1CbpD5BD8gSrn43vngU-QAoasUAhlnpybk8n5qFN2CsysfLXzMBk35n~XKAj84uTmWu~J82S~8DomnKv4NePGxgRgTX7gqyv0vwqKOwtPbZceF1zG86nEzPJz8ngqps18R16CCR13PRJ5NnJ3IpGdeOvEPGQTt~vq5oVHv-zSH2nnUxGYt-rYJw2FlBeCk09pKoDNpK05jJlPI5O~cvTcHnmpYmqKmFAMw__"

const productData = {
    title:"",
    color:"",
    size:"",
    quantity:1,
}

//should be in utils file
async function apiCall(url,method="GET",body=null){
    const options={
        method:method,
    }
    if(body) options.body = body

    try{
        let response = await fetch(BASE_URL+url, options)
        response = await response.json()
        return response //async function always return promise

    } catch(e){
        console.log(e,"API CALL FAIL")
    }
}

function createProductImage(images){
    const productImage = document.getElementById("product-image")
    const productImageSelector = document.getElementById("product-image-selector")
    const IMAGE = [IMAGE_URL1,IMAGE_URL2,IMAGE_URL3,IMAGE_URL2]

    const mainImg = document.createElement('img')
    // mainImg.src= images[0].src // img url not working
    mainImg.src = IMAGE_URL1

    images.forEach((image,index)=>{
        const img = document.createElement('img')

        img.classList.add("selector-image")
        if(index==0) img.classList.add("selected-image")

        // img.src = image.src // img url not working
        img.src = IMAGE[index]
        productImageSelector.appendChild(img)

        img.addEventListener("mouseenter",function(){
            const list = productImageSelector.children
            for(let i=0; i<list.length; i++){
                list[i].classList.remove("selected-image")
            }
            mainImg.src = this.src
            this.classList.add("selected-image")
        })
    })

    productImage.appendChild(mainImg)
}

function createOptions(options) {
    const optionsContainer = document.getElementById("options")
    const colorContainer = document.createElement("div")
    const sizeContainer = document.createElement("div")
    const hr = document.createElement("hr")


    colorContainer.className = "color-container"

    options?.forEach((option)=>{
        const p = document.createElement("p")
        p.textContent = `Choose a ${option.name}`
        p.classList.add("option-name")

        if(option.name == "Color"){
            colorContainer.appendChild(p)
        }
        if(option.name == "Size"){
            sizeContainer.appendChild(p)
        }

        option?.values?.forEach((value,index)=>{
            if(option.name == "Color"){
                const colorDiv = document.createElement("div")
                const colorSpan = document.createElement("div")
                const imgTick = document.createElement("img")

                imgTick.src = "./tick.png"
                imgTick.classList.add("tick")

                if(index==0) {
                    colorDiv.classList.add("selected-color")
                    colorSpan.appendChild(imgTick)
                    productData.color = Object.keys(value)[0]
                }

                colorDiv.classList.add("color-box")
                colorDiv.style.borderColor = Object.values(value)[0]

                colorSpan.classList.add("color")
                colorSpan.style.background = Object.values(value)[0]
                colorSpan.setAttribute("data-color", Object.keys(value)[0])

                colorSpan.addEventListener("click", function(){
                    const list = colorContainer.children
                    for(let i=0; i<list.length; i++){
                        list[i].classList.remove("selected-color")

                        if(list[i].firstChild.firstChild) {
                            list[i].firstChild.firstChild.remove()
                        }
                    }
                    this.parentElement.classList.add("selected-color")
                    this.appendChild(imgTick)

                    productData.color = this.getAttribute("data-color")
                })

                colorDiv.appendChild(colorSpan)
                colorContainer.appendChild(colorDiv)
                optionsContainer.appendChild(colorContainer)
            }

            optionsContainer.appendChild(hr)

            if(option.name == "Size"){
                const size = document.createElement("div")
                const input = document.createElement("input")
                const text = document.createElement("p")

                if(index==0){
                    input.checked=true
                    productData.size = value
                }

                size.classList.add("size")
                text.classList.add("text")

                input.type="radio"
                input.name="size"
                text.textContent = value

                size.setAttribute("data-size",value)

                size.addEventListener("click",function(){
                    input.checked=true
                    productData.size = this.getAttribute("data-size")
                })

                size.appendChild(input)
                size.appendChild(text)
                sizeContainer.appendChild(size)
                optionsContainer.appendChild(sizeContainer)
            }

        })

    })
}

const addToCart = () => {
    let text = `${productData.title} with Color ${productData.color} and Size ${productData.size} added to cart`
    const info = document.querySelector(".info")
    info.textContent = text
    info.style.display = "block"
}

const decrease = () => {
    let valueContainer = document.querySelector("#value")
    let value = parseInt(valueContainer.textContent)

    if(value==1) return
    valueContainer.textContent = value-1
    productData.quantity = value-1
}

const increase = () => {
    let valueContainer = document.querySelector("#value")
    let value = parseInt(valueContainer.textContent)

    valueContainer.textContent = value+1
    productData.quantity = value+1
}

const response = apiCall("/s/files/1/0564/3685/0790/files/singleProduct.json?v=1701948448")

response.then(data=>{
    const price = parseInt(data?.product?.price.replace("$",""))
    const comparePrice = parseInt(data?.product?.compare_at_price.replace("$",""))

    const percentage = ((comparePrice-price)/comparePrice)*100
    productData.title = data?.product?.title
    createProductImage(data?.product?.images)
    createOptions(data?.product?.options)

    document.querySelector(".product-vendor").textContent = data?.product?.vendor
    document.querySelector(".product-title").textContent = data?.product?.title
    document.querySelector(".product-price").textContent = data?.product?.price
    document.querySelector(".product-percentage").textContent = `${parseInt(percentage)}% Off`
    document.querySelector(".product-compare-price").textContent = data?.product?.compare_at_price
    document.getElementById("desc").innerHTML = data?.product?.description
})