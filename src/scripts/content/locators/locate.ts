import By from "./by";
import NoSuchElementFoundException from "../../common/exceptions/no-such-element-found-exception";
import UnsupportedOperationException from "../../common/exceptions/unsupported-operation-exception";

/**
 * implements base helper methods to locate elements in a page
 */
export default class Locate {

    /**
     * returns single element found by the given inputs
     *
     * @throws NoSuchElementFoundException - if no elements founds by given input, an exception will be thrown
     *
     * @param by - locator strategy that is used to locate the element
     * @param value - value relates to given locator strategy
     */
    public static getElement(by: By, value: string): HTMLElement {
        switch (by) {

            /**
             * by xpath
             */
            case By.XPATH: {
                let elements = this.getElementsByXpath(value);

                if (elements.length === 0)
                    throw new NoSuchElementFoundException(`No element found with locator type: ${By[by]}, value: ${value}`);

                return elements[0];
            }

            /**
             * by id
             */
            case By.ID: {
                let ele = document.getElementById(value);

                if (ele === null)
                    throw new NoSuchElementFoundException(`No element found with locator type: ${By[by]}, value: ${value}`);

                return ele;
            }

            /**
             * by class
             */
            case By.CLASS: {
                let elements = this.getElementsByClassName(value);

                if (elements.length === 0)
                    throw new NoSuchElementFoundException(`No element found with locator type: ${By[by]}, value: ${value}`);

                return <HTMLElement> elements.item(0);
            }

            /**
             * by name
             */
            case By.TAG: {
                let elements = this.getElementsByTagName(value);

                if (elements.length === 0)
                    throw new NoSuchElementFoundException(`No element found with locator type: ${By[by]}, value: ${value}`);

                return <HTMLElement> elements.item(0)
            }

            default: {
                throw new UnsupportedOperationException();
            }
        }
    }

   /**
     * returns array of elements found by the given inputs
     *
     * @param by - locator strategy that is used to locate the element
     * @param value - value relates to given locator strategy
     */
    public static getElements(by: By, value: string): Array<HTMLElement> {
        switch (by) {

            /**
             * by xpath
             */
            case By.XPATH: {
                let elements = this.getElementsByXpath(value);

                if (elements.length === 0)
                    throw new NoSuchElementFoundException(`No element found with locator type: ${By[by]}, value: ${value}`);

                return elements;
            }

            /**
             * by id
             */
            case By.ID: {
                let ele = document.getElementById(value);

                if (ele === null)
                    return [];

                return [ele];
            }

            /**
             * by class
             */
            case By.CLASS:

            /**
             * by name
             */
            case By.TAG:

            default: {
                throw new UnsupportedOperationException();
            }
        }
    }

    public static getElementsByXpath(xpath: string): Array<HTMLElement> {
        let elements: Array<HTMLElement> = [];

        let result: XPathResult = document.evaluate(
            xpath,
            document,
            null,
            XPathResult.ORDERED_NODE_ITERATOR_TYPE,
            null
        );

        for (let ele = <HTMLElement> result.iterateNext(); ele !== null;) {
            elements.push(ele);
        }

        return elements;
    }

    public static getElementsByClassName(className: string): HTMLCollectionOf<Element> {
        return document.getElementsByClassName(className);
    }

    public static getElementsByTagName(name: string): NodeListOf<Element> {
        return document.getElementsByTagName(name);
    }
}