const form = document.getElementById('generate-form');
const qr  = document.getElementById('qrcode')


const submitGeneratorQRCode = (e)=>{
    e.preventDefault();
    clearUI();
    const url =document.getElementById('url').value;
    const size = document.getElementById('size').value;

    if(url === ''){
        // alert('PLease enter a URL')
       const errorMessage = document.getElementById('errorMessage').innerHTML = "You must enter a URL";
       return false;
    }else{
        showSpinner();
        setTimeout(()=>{
            hideSpinner()
            generateQRCode(url, size)

            setTimeout(()=>{ 
                const saveUrl = qr.querySelector('img').src;
                createSaveQRBtn(saveUrl);
            }, 50)
        }, 1000);
    }
}



const generateQRCode =(url, size)=>{
    const qrcode = new QRCode('qrcode', {
        text: url,
        width:size,
        height: size
    })
}

const showSpinner = ()=>{
    const spinner = document.getElementById('spinner')
    spinner.style.display = 'block';
}

const hideSpinner = ()=>{
    const spinner = document.getElementById('spinner')
    spinner.style.display = 'none';
}
hideSpinner();


const clearUI = ()=>{
    qr.innerHTML = '';
    const saveBtnLink = document.getElementById('save-link')
    if(saveBtnLink){
        saveBtnLink.remove();
    }
}

const createSaveQRBtn = (saveUrl)=>{
    const link = document.createElement('a');
    link.id = 'save-link';
    link.classList = 'bg-red-500 hover:bg-red-700 text-white font-bold py-2 rounded w-1/3 m-auto my-5';
    link.href = saveUrl;
    link.download ='qrcode';
    link.innerText = 'Save QR Code Image';
    document.getElementById('generated').appendChild(link)
}

form.addEventListener('submit', submitGeneratorQRCode);