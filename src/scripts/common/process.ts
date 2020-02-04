/**
 * this is just a variable to avoid compilation error when using process.env.NODE_ENV
 * in code
 * webpack will replace process.env.NODE_ENV with actual value at compile time
 */
export declare var process: {
    env: {
        NODE_ENV: string;
    };
};

