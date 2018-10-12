import By from "../../content/locators/by";
import ICommandRequestModel from "./i-command-request-model";
import CommandType from "../command-type";

export default class TypeRequestModel implements ICommandRequestModel {
    command: CommandType = CommandType.TYPE;
    by: By;
    value: string;
    text: string;

    constructor(by: By, value: string, text: string) {
        this.by = by;
        this.value = value;
        this.text = text;
    }
}