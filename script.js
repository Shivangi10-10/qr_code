document.getElementById('generateBtn').addEventListener('click', function() {
    let qrText = document.getElementById('qrText').value;
    if (qrText.trim() === "") {
        alert("Please enter text or URL");
        return;
    }
    
    generateQRCode(qrText, "#000000");
});

function generateQRCode(text, color) {
    let qrCodeContainer = document.getElementById('qrCodeContainer');
    qrCodeContainer.innerHTML = "";
    
    let qrCode = new QRCode(qrCodeContainer, {
        text: text,
        width: 256,
        height: 256,
        colorDark: color,
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });

    setTimeout(() => {
        let qrImage = qrCodeContainer.querySelector('img').src;
        document.getElementById('iconContainer').classList.remove('hidden');
        
        document.getElementById('downloadBtn').onclick = () => {
            const downloadLink = document.createElement('a');
            downloadLink.href = qrImage;
            downloadLink.download = 'QRCode.png';
            downloadLink.click();
        };

        document.getElementById('shareBtn').onclick = () => {
            let whatsappUrl = `https://wa.me/?text=${encodeURIComponent('Here is your generated QR code: ' + qrImage)}`;
            window.open(whatsappUrl, '_blank');
        };

        document.getElementById('styleBtn').onclick = () => {
            document.getElementById('colorPicker').click();
        };
    }, 500);
}

document.getElementById('colorPicker').addEventListener('input', function() {
    let qrText = document.getElementById('qrText').value;
    let selectedColor = document.getElementById('colorPicker').value;
    generateQRCode(qrText, selectedColor);
});
