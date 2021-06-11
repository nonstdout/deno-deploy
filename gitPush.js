const userGithubRepo = "https://github.com/nonstdout/deno-deploy.git"

const commands = [
    {
        cmd: ["git", "commit", "-am", "'DENO COMMIT'"],
        stdout: "piped",
        stderr: "piped",
    },
    {
        cmd: ["git", "push"],
        stdout: "piped",
        stderr: "piped",
    },
]

for (const item of commands) {

    let cmd = Deno.run(item)


    const { code } = await cmd.status(); // (*1); wait here for child to finish

    const rawOutput = await cmd.output();
    const rawError = await cmd.stderrOutput();


    if (code === 0) {
        await Deno.stdout.write(rawOutput);
        console.log(`Commited ${userGithubRepo} sucessfully.`)
    } else {
        const errorString = new TextDecoder().decode(rawError);
        console.log(errorString);
    }
    Deno.exit(code);
}

