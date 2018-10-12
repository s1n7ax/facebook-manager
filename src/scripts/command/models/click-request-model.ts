import By from "../../content/locators/by";
import CommandType from "../command-type";
import ICommandRequestModel from "./i-command-request-model";

export default class ClickRequestModel implements ICommandRequestModel {
    command: CommandType = CommandType.CLICK;
    by: By;
    value: string;


    constructor(by: By, value: string) {
        this.by = by;
        this.value = value;
    }
}