const Max_Items = 5;
let open = false;
function Menu_open(x) {
  open = !open;
  return x.length > Max_Items;
}
export { Menu_open };
