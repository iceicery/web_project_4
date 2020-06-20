const togglePopup = (element, darkElement) => {
    element.classList.toggle('hidden');
    darkElement.classList.toggle('hidden');
};

export { togglePopup };