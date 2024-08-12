const fileInput = document.querySelector("#fileInput");
    const img = document.querySelector("img");
    fileInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
          img.src = event.target.result;
        };
        reader.readAsDataURL(file);
        document.querySelector('label').style.display = 'none'
    }
    });