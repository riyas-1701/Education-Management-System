const Response = (
    res,
    statusCode,
    success,
    message,
    data = null
) => {
    return res.status(statusCode).json({
        success,
        message,
        data,
    });
};

const sendResponse = {
    success: (res, message, data = null) =>
        Response(res, 200, true, message, data),

    created: (res, message, data = null) =>
        Response(res, 201, true, message, data),

    badRequest: (res, message) =>
        Response(res, 400, false, message),

    unauthorized: (res, message) =>
        Response(res, 401, false, message),

    forbidden: (res, message) =>
        Response(res, 403, false, message),

    notFound: (res, message) =>
        Response(res, 404, false, message),

    conflict: (res, message) =>
        Response(res, 409, false, message),

    serverError: (res, message) =>
        Response(res, 500, false, message),
};

module.exports = sendResponse;