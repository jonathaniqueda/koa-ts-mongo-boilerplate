export interface IConfig {
    port: number;
    prettyLog: boolean;
}

const { PORT, APP_ENV } = process.env;

if (!PORT || !APP_ENV) {
    throw new Error('PORT or APP_ENV not defined');
}

const config = {
    port: PORT,
    prettyLog: APP_ENV === 'local',
};

export { config };
