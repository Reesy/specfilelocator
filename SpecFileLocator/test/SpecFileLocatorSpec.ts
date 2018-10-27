import chai = require("chai");
import { SpecFileLocator } from "../src/SpecFileLocator";
import { StrippedFileInfo } from "../interfaces/StrippedFileInfo";

describe("SpecFileLocator", () =>
{
    describe("deduceSpecFileName", () =>
    {
        describe("When called with a filePath that is already a Spec file", () =>
        {
            describe("And the filePath is JS", () =>
            {   
                let specFileLocator;
                let result: string;
                before(() =>
                {
                    specFileLocator = new SpecFileLocator();
                    result = specFileLocator.deduceSpecFileName("./example/parent/child/Example1Spec.js");
                });
                it("Should return the file that the passed in path leads too ", () =>
                {
                    chai.expect(result).to.equal("Example1Spec.js");
                });
            });
            
            describe("And When that filePath is a TS file", () =>
            {
                    let specFileLocator;
                    let result: string;
                    before(() =>
                    {
                        specFileLocator = new SpecFileLocator();
                        result = specFileLocator.deduceSpecFileName("./example/parent/child/Example2Spec.ts");
                    });
                    it("Should return a .js verson of the passed in path", () =>
                    {
                       chai.expect(result).to.equal("Example2Spec.js")
                    });
            });
        });
    
        describe("When called with a filePath that isn't a SpecFile", () =>
        {
            describe("And the filePath is JS", () =>
            {   
                let specFileLocator;
                let result: string;
                before(() =>
                {
                    specFileLocator = new SpecFileLocator();
                    result = specFileLocator.deduceSpecFileName("./example/parent/child/Example3.js");
                });
                it("Should return a 'Spec.js' version of the passed in file", () =>
                {
                    chai.expect(result).to.equal("Example3Spec.js");
                });
            });
            
            describe("And the filePath is a TS file", () =>
            {
                let specFileLocator;
                let result: string;
                before(() =>
                {
                    specFileLocator = new SpecFileLocator();
                    result = specFileLocator.deduceSpecFileName("./example/parent/child/Example4.ts");
                });
                it("Should return a 'Spec.js' version of the passed in file", () =>
                {
                    chai.expect(result).to.equal("Example4Spec.js")
                })
            })
        });
    })
    describe("stripFile", () =>
    {
        describe("When a file path is passed in", () =>
        {
            let specFileLocator = new SpecFileLocator();
            let exampleFilePath: string;
            let result: StrippedFileInfo;
            before(() =>
            {
                exampleFilePath = "./parent/child/exampleSpec.ts";
                result = specFileLocator.stripFile(exampleFilePath);
            })
            it("Should return the file path inside a StrippedFileInfo object", () => 
            {
                chai.expect(result.filePath).to.equal(exampleFilePath);
            });
            it("Should return a directory of './parent/child/'", () =>
            {
                chai.expect(result.directory).to.equal("./parent/child/");
            });

            describe("And the fileName is examplespec", () => {
                let specFileLocator = new SpecFileLocator();
                let exampleFilePath: string;
                let result: StrippedFileInfo;
                before(() => {
                    exampleFilePath = "./parent/child/examplespec.ts";
                    result = specFileLocator.stripFile(exampleFilePath);
                });

                it("Should return the fileName", () =>
                {
                    chai.expect(result.fileName).to.equal("examplespec");
                });
            });

            describe("And the file type is JS", () =>
            {
                let specFileLocator = new SpecFileLocator();
                let exampleFilePath: string;
                let result: StrippedFileInfo;
                before(() => {
                    exampleFilePath = "./parent/child/exampleSpec.js";
                    result = specFileLocator.stripFile(exampleFilePath);
                });

                it("Should return a StrippedFileInfo object with fileType of 'js'", () =>
                {
                    chai.expect(result.fileType).to.equal('js');
                });
            });

            describe("And the file type is TS", () =>
            {
                let specFileLocator = new SpecFileLocator();
                let exampleFilePath: string;
                let result: StrippedFileInfo;
                before(() => {
                    exampleFilePath = "./parent/child/exampleSpec.ts";
                    result = specFileLocator.stripFile(exampleFilePath);
                });

                it("Should return a StrippedFileInfo object with fileType of 'ts'", () =>
                {
                    chai.expect(result.fileType).to.equal('ts');
                })
            });
        });

        describe("When an empty string is passed in", () =>
        {
            let specFileLocator = new SpecFileLocator();
            let exampleFilePath: string;
            let result: StrippedFileInfo;
            before(() => {
                exampleFilePath = "";
                result = specFileLocator.stripFile(exampleFilePath);
            });
            
            it("Should return a fileType of ''", () =>
            {
                chai.expect(result.fileType).to.equal("");
            });

            it("Should return a filePath of ''", () =>
            {
                chai.expect(result.filePath).to.equal("");
            });

            it("Should return a fileName of ''", () =>
            {
                chai.expect(result.fileType).to.equal("");
            });

            it("Should return a directory of ''", () => 
            {
                chai.expect(result.directory).to.equal("");
            });
        });
    });
    describe.only("locateSpecFile", () =>
    {

        describe("When given a starting path", () => 
        {
            describe("And a 'test' folder exists in the parent folder of the starting path", () =>
            {
                describe("And a related Spec file exists in that folder", () =>
                {   
                    let specFileLocator: SpecFileLocator = new SpecFileLocator;
                    let result: string;
                    before(() =>{
                        result = specFileLocator.locateSpecFile("./test/MockFolderStructure/TestFileAndSpecExists/src/mock.ts");
                    })
                    it("Should return that spec files path", ()=>
                    {
                        chai.expect(result).to.equal("./test/MockFolderStructure/TestFolderAndSpecExists/test/mockSpec.ts");
                    })
                })

                describe("And a related Spec file does not exist in that folder", () =>
                {
                    let specFileLocator: SpecFileLocator = new SpecFileLocator;
                    let result: string;
                    before(() =>{
                        result = specFileLocator.locateSpecFile("./test/MockFolderStructure/TestFolderAndSpecExists/src/DoesntExist.ts");
                    })
                    it("Should return an empty string", ()=>
                    {
                        chai.expect(result).to.equal("");
                    })
                })
            });

            describe("And a 'test' folder does not exist in the parent folder of the starting path", () =>
            {
                let specFileLocator: SpecFileLocator = new SpecFileLocator;
                let result: string;
                before(() =>{
                    result = specFileLocator.locateSpecFile("./test/MockFolderStructure/TestFolderDoesntExist/src/mock.ts");
                })
                it("Should return an empty string", ()=>
                {

                })
            })
        });
    })
});
