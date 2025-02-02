module.exports = {
    transform: {
        "\\.ts$": "ts-jest",
        "\\.js$": "babel-jest",
        "\\.tmx$": "<rootDir>/node_modules/@rpgjs/compiler/tmx-loader/index.js",
        "\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|ogg)$": "<rootDir>/node_modules/@rpgjs/compiler/jest/image.js",
        "\\.vue$": "@vue/vue3-jest"
    },
    transformIgnorePatterns: [
        "/node_modules/(?!(@?rpgjs.+)/)/"
    ],
    moduleFileExtensions: [
        "ts",
        "js",
        "vue",
        "json"
    ],
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    "testEnvironmentOptions": { "resources": "usable" },
    moduleDirectories: [
        ".",
        "src",
        "node_modules"
    ],
    setupFiles: ["<rootDir>/node_modules/@rpgjs/compiler/jest/setup.js"],
    moduleNameMapper: {
        '^server!(.*)$': '$1',
        '^mmorpg!(.*)$': '$1',
        '^rpg!(.*)$': '$1',
        '^development!(.*)$': '$1',
        '^production!(.*)$': '$1',
        '^client!(.*)$': '$1',
        
        //'^client!(.*)$': '<rootDir>/node_modules/@rpgjs/compiler/loaders/null.js'
    }
}