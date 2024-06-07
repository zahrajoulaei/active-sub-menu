var menuLinks = [
  { text: "about", href: "/about" },
  {
    text: "catalog",
    href: "#",
    subLinks: [
      { text: "all", href: "/catalog/all" },
      { text: "top selling", href: "/catalog/top" },
      { text: "search", href: "/catalog/search" },
    ],
  },
  {
    text: "orders",
    href: "#",
    subLinks: [
      { text: "new", href: "/orders/new" },
      { text: "pending", href: "/orders/pending" },
      { text: "history", href: "/orders/history" },
    ],
  },
  {
    text: "account",
    href: "#",
    subLinks: [
      { text: "profile", href: "/account/profile" },
      { text: "sign out", href: "/account/signout" },
    ],
  },
];

const mainEl = document.querySelector("main");

mainEl.style.backgroundColor = "var(--main-bg)";

const headerContent = "DOM Manipulation";
const headerElement = mainEl.appendChild(document.createElement("h1"));
headerElement.textContent = headerContent;

mainEl.classList.add("flex-ctr");
const topMenuEl = document.getElementById("top-menu");

topMenuEl.style.height = "100%";
topMenuEl.style.backgroundColor = "var(--top-menu-bg)";
topMenuEl.classList.add("flex-around");

menuLinks.forEach((item) => {
  const a = document.createElement("a");
  a.href = item.href;
  a.textContent = item.text;
  a.subLinks = item.subLinks || null;
  topMenuEl.appendChild(a);
  console.log("sublinka:", a.subLinks);
});

const subMenuEl = document.getElementById("sub-menu");
subMenuEl.style.height = "100%";
subMenuEl.style.backgroundColor = "var(--sub-menu-bg)";
subMenuEl.classList.add("flex-around");
subMenuEl.style.position = "absolute";
subMenuEl.style.top = "0";

const topMenuLinks = document.querySelectorAll("#top-menu a");
console.log(topMenuLinks);

topMenuEl.addEventListener("click", (event) => {
  event.preventDefault();
  if (event.target.tagName.toLowerCase() !== "a") {
    return;
  }
  console.log("An <a> element was clicked:", event.target.href);
  subMenuEl.style.top = "0";

  const isActive = event.target.classList.contains("active");

  topMenuLinks.forEach((link) => {
    link.classList.remove("active");
  });

  if (!isActive) {
    event.target.classList.add("active");

    const clickedLinkText = event.target.textContent;
    const linkObject = menuLinks.find((link) => link.text === clickedLinkText);

    if (linkObject && linkObject.subLinks) {
      subMenuEl.style.top = "100%";
      buildSubmenu(linkObject.subLinks);
    } else {
      subMenuEl.style.top = "0";
    }
    console.log("Active classes:", document.querySelectorAll("a.active"));
  }
});

function buildSubmenu(subLinks) {
  subMenuEl.innerHTML = "";
  subLinks.forEach((item) => {
    const a = document.createElement("a");
    a.href = item.href;
    a.textContent = item.text;
    subMenuEl.appendChild(a);
  });
}

subMenuEl.addEventListener("click", (event) => {
  event.preventDefault();
  if (event.target.tagName.toLowerCase() !== "a") {
    return;
  }
  console.log("An <a> element in sub menu was clicked:", event.target.href);

  subMenuEl.style.top = "0";

  topMenuLinks.forEach((link) => {
    link.classList.remove("active");
  });

  const newHeader = document.createElement("h1");
  newHeader.textContent = event.target.textContent;
  mainEl.innerHTML = "";
  mainEl.appendChild(newHeader);

  if (event.target.textContent.toLowerCase() === "about") {
    const aboutHeader = document.createElement("h1");
    aboutHeader.textContent = "About";
    mainEl.innerHTML = "";
    mainEl.appendChild(aboutHeader);
  }
});
