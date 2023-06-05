export const enableDropdown = () => {
    document.addEventListener("click", e => {
        if (e.target instanceof Element) {
            const isDropdownButton = e.target.matches("[data-dropdown-button]");
            if (!isDropdownButton && e.target.closest("[data-dropdown]") != null) return

            let currentDropdown: Element | null
            if (isDropdownButton) {
                currentDropdown = e.target.closest("[data-dropdown]")
                currentDropdown?.classList.toggle("active")
            }        

            document.querySelectorAll("[data-dropdown].active").forEach(dropdown => {
                if (dropdown === currentDropdown) return
                dropdown.classList.remove("active")
            })
        }
    })
}