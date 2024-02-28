function checkRateLimit(headers) {
    if (headers && headers['x-app-usage']) {
        const limit = headers['x-app-usage'];
        const { call_count, total_cputime, total_time } = JSON.parse(limit);
        console.log(`Rate limit - Call count: ${call_count}, Total CPU time: ${total_cputime}, Total time: ${total_time}`);
    } else {
        console.log('Rate limit information not available.');
    }
}

function handleRateLimitError(errorCode, errorMessage) {
    switch (errorCode) {
        case 4:
            console.error(`App rate limit exceeded. Error message: ${errorMessage}`);
            break;
        case 17:
            console.error(`User rate limit exceeded. Error message: ${errorMessage}`);
            break;
        case 32:
            console.error(`Page request limit exceeded. Error message: ${errorMessage}`);
            break;
        case 613:
            console.error(`Custom rate limit exceeded. Error message: ${errorMessage}`);
            break;
        default:
            console.error(`Unknown rate limit error. Error message: ${errorMessage}`);
    }
}

module.exports = { checkRateLimit, handleRateLimitError };
