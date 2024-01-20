type News = {
    id: string;
    icon: string;
    title: string;
    desc: {
        message?: string;
        highlights?: string;
    };
    timestamp: string;
    click: () => void;
};