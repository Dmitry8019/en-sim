interface SidebarSwitchState {
    toggleSidebar: VoidFunction | null;
    shareSidebarSwitchFun: (callback: VoidFunction) => void;
}

export const sidebarSwitchState: SidebarSwitchState = {
    toggleSidebar: null,
    shareSidebarSwitchFun(callback: VoidFunction) {
        this.toggleSidebar = callback;
    },
};
