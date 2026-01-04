#!/usr/bin/env node

/* eslint-disable */
/**
 * TradeSense AI - Setup Verification Script
 * This script checks if the frontend is properly set up
 */

const fs = require("fs");
const path = require("path");

// Colors for console output
const colors = {
    reset: "\x1b[0m",
    green: "\x1b[32m",
    red: "\x1b[31m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    cyan: "\x1b[36m",
};

function log(message, color = colors.reset) {
    console.log(`${color}${message}${colors.reset}`);
}

function success(message) {
    log(`✓ ${message}`, colors.green);
}

function error(message) {
    log(`✗ ${message}`, colors.red);
}

function warning(message) {
    log(`⚠ ${message}`, colors.yellow);
}

function info(message) {
    log(`ℹ ${message}`, colors.blue);
}

function header(message) {
    console.log("\n" + "=".repeat(50));
    log(message, colors.cyan);
    console.log("=".repeat(50) + "\n");
}

// Check if file exists
function checkFile(filePath, description) {
    if (fs.existsSync(filePath)) {
        success(`${description} exists`);
        return true;
    } else {
        error(`${description} is missing: ${filePath}`);
        return false;
    }
}

// Check if directory exists
function checkDirectory(dirPath, description) {
    if (fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory()) {
        success(`${description} exists`);
        return true;
    } else {
        error(`${description} is missing: ${dirPath}`);
        return false;
    }
}

// Main verification function
async function verifySetup() {
    let totalChecks = 0;
    let passedChecks = 0;

    header("TradeSense AI - Setup Verification");

    // 1. Check Node.js version
    header("1. Checking Node.js Version");
    totalChecks++;
    const nodeVersion = process.version;
    const majorVersion = parseInt(nodeVersion.slice(1).split(".")[0]);

    if (majorVersion >= 18) {
        success(`Node.js version: ${nodeVersion} (Requirement: >=18)`);
        passedChecks++;
    } else {
        error(`Node.js version: ${nodeVersion} (Requirement: >=18)`);
        warning("Please upgrade Node.js to version 18 or higher");
    }

    // 2. Check critical files
    header("2. Checking Critical Files");
    const criticalFiles = [
        { path: "package.json", desc: "package.json" },
        { path: "vite.config.js", desc: "Vite config" },
        { path: "tailwind.config.js", desc: "Tailwind config" },
        { path: "postcss.config.js", desc: "PostCSS config" },
        { path: "index.html", desc: "HTML entry point" },
        { path: ".eslintrc.cjs", desc: "ESLint config" },
        { path: ".gitignore", desc: "Git ignore file" },
    ];

    criticalFiles.forEach((file) => {
        totalChecks++;
        if (checkFile(file.path, file.desc)) {
            passedChecks++;
        }
    });

    // 3. Check src directory structure
    header("3. Checking Source Directory Structure");
    const srcDirs = [
        { path: "src", desc: "src directory" },
        { path: "src/components", desc: "components directory" },
        { path: "src/pages", desc: "pages directory" },
        { path: "src/assets", desc: "assets directory" },
    ];

    srcDirs.forEach((dir) => {
        totalChecks++;
        if (checkDirectory(dir.path, dir.desc)) {
            passedChecks++;
        }
    });

    // 4. Check main source files
    header("4. Checking Main Source Files");
    const srcFiles = [
        { path: "src/main.jsx", desc: "Entry point (main.jsx)" },
        { path: "src/App.jsx", desc: "App component" },
        { path: "src/index.css", desc: "Global styles" },
    ];

    srcFiles.forEach((file) => {
        totalChecks++;
        if (checkFile(file.path, file.desc)) {
            passedChecks++;
        }
    });

    // 5. Check components
    header("5. Checking Components");
    const components = [
        { path: "src/components/AnimatedButton.jsx", desc: "AnimatedButton" },
        { path: "src/components/AnimatedCard.jsx", desc: "AnimatedCard" },
        { path: "src/components/AnimatedCounter.jsx", desc: "AnimatedCounter" },
        {
            path: "src/components/ParticleBackground.jsx",
            desc: "ParticleBackground",
        },
        { path: "src/components/Sidebar.jsx", desc: "Sidebar" },
        { path: "src/components/Navbar.jsx", desc: "Navbar" },
    ];

    components.forEach((comp) => {
        totalChecks++;
        if (checkFile(comp.path, comp.desc)) {
            passedChecks++;
        }
    });

    // 6. Check pages
    header("6. Checking Pages");
    const pages = [
        { path: "src/pages/LandingPage.jsx", desc: "Landing Page" },
        { path: "src/pages/LoginPage.jsx", desc: "Login Page" },
        { path: "src/pages/RegisterPage.jsx", desc: "Register Page" },
        { path: "src/pages/Dashboard.jsx", desc: "Dashboard" },
    ];

    pages.forEach((page) => {
        totalChecks++;
        if (checkFile(page.path, page.desc)) {
            passedChecks++;
        }
    });

    // 7. Check dependencies
    header("7. Checking Dependencies");
    totalChecks++;
    if (checkDirectory("node_modules", "node_modules")) {
        passedChecks++;

        // Check for critical packages
        const criticalPackages = [
            "react",
            "react-dom",
            "react-router-dom",
            "framer-motion",
            "react-tsparticles",
            "lightweight-charts",
            "lucide-react",
            "tailwindcss",
            "vite",
        ];

        info("Checking critical packages...");
        let packagesOk = true;
        criticalPackages.forEach((pkg) => {
            const pkgPath = path.join("node_modules", pkg);
            if (fs.existsSync(pkgPath)) {
                success(`  ${pkg}`);
            } else {
                error(`  ${pkg} is missing`);
                packagesOk = false;
            }
        });

        if (!packagesOk) {
            warning("Some packages are missing. Run: npm install");
        }
    } else {
        warning("node_modules not found. Run: npm install");
    }

    // 8. Check documentation
    header("8. Checking Documentation");
    const docs = [
        { path: "README.md", desc: "README" },
        { path: "SETUP_GUIDE.md", desc: "Setup Guide" },
        { path: "FEATURES.md", desc: "Features Documentation" },
        { path: "PROJECT_OVERVIEW.md", desc: "Project Overview" },
        { path: "QUICK_REFERENCE.md", desc: "Quick Reference" },
    ];

    docs.forEach((doc) => {
        totalChecks++;
        if (checkFile(doc.path, doc.desc)) {
            passedChecks++;
        }
    });

    // 9. Check package.json content
    header("9. Validating package.json");
    totalChecks++;
    try {
        const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));

        if (
            packageJson.name &&
            packageJson.dependencies &&
            packageJson.scripts
        ) {
            success("package.json structure is valid");
            passedChecks++;

            // Check for required scripts
            const requiredScripts = ["dev", "build", "preview"];
            info("Checking npm scripts...");
            requiredScripts.forEach((script) => {
                if (packageJson.scripts[script]) {
                    success(`  Script '${script}' exists`);
                } else {
                    error(`  Script '${script}' is missing`);
                }
            });
        } else {
            error("package.json structure is invalid");
        }
    } catch (err) {
        error("Failed to parse package.json: " + err.message);
    }

    // Final Summary
    header("Verification Summary");
    const percentage = Math.round((passedChecks / totalChecks) * 100);

    console.log(`Total Checks: ${totalChecks}`);
    log(`Passed: ${passedChecks}`, colors.green);
    log(`Failed: ${totalChecks - passedChecks}`, colors.red);
    console.log(`Success Rate: ${percentage}%\n`);

    if (percentage === 100) {
        success("✓ All checks passed! Your setup is complete. 🎉");
        info("\nYou can now run: npm run dev");
    } else if (percentage >= 80) {
        warning("⚠ Most checks passed, but some issues need attention.");
        info("Review the errors above and fix them.");
    } else {
        error("✗ Multiple issues detected. Please review the setup.");
        info("\nRecommended actions:");
        info("1. Ensure you are in the correct directory");
        info("2. Run: npm install");
        info("3. Check that all files were created correctly");
    }

    console.log("\n" + "=".repeat(50) + "\n");

    // Exit with appropriate code
    process.exit(percentage < 100 ? 1 : 0);
}

// Run verification
verifySetup().catch((err) => {
    error("Verification failed with error: " + err.message);
    process.exit(1);
});
