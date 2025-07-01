import { expect, test } from "vitest";
import { execSync } from "child_process";
import { readFileSync } from "fs";

test("local deployment build succeeds", () => {
	// Test that wrangler can build the worker locally without errors
	const result = execSync("npm run build:local-ts", { 
		encoding: "utf-8",
		cwd: process.cwd()
	});
	
	// Should contain success indicators from wrangler 4
	expect(result).toContain("Total Upload:");
	expect(result).toContain("--dry-run: exiting now");
	expect(result).not.toContain("Error");
	expect(result).not.toContain("Failed");
});

test("CSS build succeeds", () => {
	// Test that CSS builds without errors
	const result = execSync("npm run build:css", { 
		encoding: "utf-8",
		cwd: process.cwd()
	});
	
	// Wrangler 4 changed output format - check for successful completion
	expect(result).toContain("tailwindcss");
	expect(result).not.toContain("Error");
	expect(result).not.toContain("Failed");
});

test("built CSS file exists and has content", () => {
	// First ensure CSS is built
	execSync("npm run build:css", { cwd: process.cwd() });
	
	// Check the CSS file exists and has content
	const cssContent = readFileSync("./assets/static/style.css", "utf-8");
	expect(cssContent.length).toBeGreaterThan(0);
	expect(cssContent).toContain("/*"); // Should contain Tailwind comments
});

test("deployment artifacts are created", () => {
	// Test that dry run creates the expected output directory
	execSync("npm run build:local-ts", { cwd: process.cwd() });
	
	// Check that dist directory exists (from --outdir dist flag)
	const result = execSync("ls -la dist/", { 
		encoding: "utf-8",
		cwd: process.cwd()
	});
	
	expect(result).toContain("index.js"); // Should contain the bundled worker
});