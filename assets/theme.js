  class SidebarDrawer extends HTMLElement {
    constructor() {
      super();
      this.wrapper = document.createElement("div");
      this.wrapper.className = "sidebar-drawer-wrapper";

      this.backdrop = document.createElement("div");
      this.backdrop.className = "sidebar-drawer-backdrop";

      this.drawer = document.createElement("div");
      this.drawer.className = "sidebar-drawer";
    }

    connectedCallback() {
      while (this.childNodes.length) {
        this.drawer.appendChild(this.childNodes[0]);
      }

      this.wrapper.appendChild(this.backdrop);
      this.wrapper.appendChild(this.drawer);
      this.appendChild(this.wrapper);

      this.backdrop.addEventListener("click", () => this.close());

      document.addEventListener(
        "keydown",
        (this._escHandler = (e) => {
          if (this.isOpen() && e.key === "Escape") this.close();
        })
      );

      this.drawer.querySelectorAll("#close-sidebar-btn").forEach((btn) => {
        btn.addEventListener("click", () => this.close());
      });
    }

    disconnectedCallback() {
      document.removeEventListener("keydown", this._escHandler);
    }

    open() {
      this.wrapper.style.display = "block";
      this.drawer.classList.remove("slide-out");
      this.drawer.classList.add("slide-in");
      this.wrapper.classList.add("open");
    }

    close() {
      this.drawer.classList.remove("slide-in");
      this.drawer.classList.add("slide-out");
      this.drawer.addEventListener(
        "animationend",
        () => {
          this.wrapper.classList.remove("open");
          this.wrapper.style.display = "none";
        },
        { once: true }
      );
    }

    isOpen() {
      return this.wrapper.classList.contains("open");
    }
  }

  customElements.define("sidebar-drawer", SidebarDrawer);

  document.getElementById("open-sidebar-btn").onclick = () => {
    document.getElementById("sidebarDrawer").open();
  };
