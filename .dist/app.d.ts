import { Application } from "express";
export default class App {
    app: Application;
    port: number;
    constructor(port: number);
    private connectToMongo;
    private initializeApollo;
    listen(): void;
}
