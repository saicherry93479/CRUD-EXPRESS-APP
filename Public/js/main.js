if (window.history.replaceState) {
  window.history.replaceState(null, null, window.location.href);
}
const changeHandler = (ele) => {
  console.log("changeHandler ", ele.value);
  window.location = `/?search=${ele.value}`;
};

window.onload = () => {
  const select = document.getElementById("selectID");
  const search = window.location.search.split("=")[1];
  switch (search) {
    case "ALL":
      select.options[0].selected = true;
      break;
    case "COMPLETED":
      select.options[1].selected = true;
      break;
    case "DELETED":
      select.options[2].selected = true;
      break;
    case "ACTIVE":
      select.options[3].selected = true;
      break;
    default:
      select.options[0].selected = true;
      break;
  }
};
