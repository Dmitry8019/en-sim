interface RightSidebarSwitchState {
    toggleRightSidebar: VoidFunction | null;
    shareRightSidebarSwitchFun: (callback: VoidFunction) => void;
}

export const rightSidebarSwitchState: RightSidebarSwitchState = {
    toggleRightSidebar: null,
    shareRightSidebarSwitchFun(callback: VoidFunction) {
        this.toggleRightSidebar = callback;
    },
};
