const fileInput = document.querySelector("#fileInput");
const form = document.querySelector("form");
fileInput.addEventListener("change", (e) => {
  form.submit();
});

const deletePins = document.querySelectorAll(".delete_pin");
const cancelBtns = document.querySelectorAll(".cancel_btn");

deletePins.forEach((deletePin) => {
  deletePin.addEventListener("click", () => {
    deletePin.nextElementSibling.style.display = "flex";
  });
});
cancelBtns.forEach((cancelBtn) => {
  cancelBtn.addEventListener("click", () => {
    cancelBtn.parentElement.style.display = "none";
  });
});
