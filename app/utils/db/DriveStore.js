import { observable, action, computed } from 'mobx';


class Drive {
    @observable file = null;
    @observable DropDown = [];
    @observable DropDownContent = [];
    @observable isVisibleDropdown= false;
    @observable isVisibleContent = false;
    @observable isLoading = false;

    @action addFile = (filedetails) => {
        this.file = filedetails;
    }
    @action addDropDownList = (dropDown) => {
        this.DropDown.push(dropDown);
    }
    @action addDropDownContent = (dropDownContent) => {
        this.DropDownContent.push(dropDownContent);
    }
    @action isVisible = () => {
        this.isVisibleDropdown = !this.isVisibleDropdown;
    }
    @action isRenderLoading = (value) => {
        this.isLoading = value;
    }
    @computed get getCountOfDropDown() {
        this.DropDownContent.length;
    }
 }

const DriveStore = new Drive();

export default DriveStore;