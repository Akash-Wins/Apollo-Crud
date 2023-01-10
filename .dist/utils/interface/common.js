"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toError = exports.joiToError = void 0;
function joiToError(joiError) {
    let message = "There was an error processing your request. Please contact support.";
    if (joiError && joiError.details && joiError.details[0]) {
        message = joiError.details[0].message;
    }
    else {
        message = joiError.message;
    }
    const error = {
        message,
    };
    return error;
}
exports.joiToError = joiToError;
function toError(message) {
    const error = {
        message,
    };
    return error;
}
exports.toError = toError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3V0aWxzL2ludGVyZmFjZS9jb21tb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBYUEsU0FBZ0IsVUFBVSxDQUFDLFFBQWE7SUFDdEMsSUFBSSxPQUFPLEdBQ1QscUVBQXFFLENBQUM7SUFDeEUsSUFBSSxRQUFRLElBQUksUUFBUSxDQUFDLE9BQU8sSUFBSSxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFO1FBQ3ZELE9BQU8sR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztLQUN2QztTQUFNO1FBQ0wsT0FBTyxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUM7S0FDNUI7SUFFRCxNQUFNLEtBQUssR0FBVztRQUNwQixPQUFPO0tBQ1IsQ0FBQztJQUVGLE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQztBQWRELGdDQWNDO0FBRUQsU0FBZ0IsT0FBTyxDQUFDLE9BQWU7SUFDckMsTUFBTSxLQUFLLEdBQVc7UUFDcEIsT0FBTztLQUNSLENBQUM7SUFFRixPQUFPLEtBQUssQ0FBQztBQUNmLENBQUM7QUFORCwwQkFNQyJ9