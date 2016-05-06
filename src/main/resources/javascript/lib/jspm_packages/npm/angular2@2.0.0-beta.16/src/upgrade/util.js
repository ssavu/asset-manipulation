/* */ 
"format cjs";
'use strict';"use strict";
function stringify(obj) {
    if (typeof obj == 'function')
        return obj.name || obj.toString();
    return '' + obj;
}
exports.stringify = stringify;
function onError(e) {
    // TODO: (misko): We seem to not have a stack trace here!
    console.log(e, e.stack);
    throw e;
}
exports.onError = onError;
function controllerKey(name) {
    return '$' + name + 'Controller';
}
exports.controllerKey = controllerKey;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRpZmZpbmdfcGx1Z2luX3dyYXBwZXItb3V0cHV0X3BhdGgtV1MzalB0bnYudG1wL2FuZ3VsYXIyL3NyYy91cGdyYWRlL3V0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLG1CQUEwQixHQUFRO0lBQ2hDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sR0FBRyxJQUFJLFVBQVUsQ0FBQztRQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNoRSxNQUFNLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQztBQUNsQixDQUFDO0FBSGUsaUJBQVMsWUFHeEIsQ0FBQTtBQUdELGlCQUF3QixDQUFNO0lBQzVCLHlEQUF5RDtJQUN6RCxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDeEIsTUFBTSxDQUFDLENBQUM7QUFDVixDQUFDO0FBSmUsZUFBTyxVQUl0QixDQUFBO0FBRUQsdUJBQThCLElBQVk7SUFDeEMsTUFBTSxDQUFDLEdBQUcsR0FBRyxJQUFJLEdBQUcsWUFBWSxDQUFDO0FBQ25DLENBQUM7QUFGZSxxQkFBYSxnQkFFNUIsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIlxuZXhwb3J0IGZ1bmN0aW9uIHN0cmluZ2lmeShvYmo6IGFueSk6IHN0cmluZyB7XG4gIGlmICh0eXBlb2Ygb2JqID09ICdmdW5jdGlvbicpIHJldHVybiBvYmoubmFtZSB8fCBvYmoudG9TdHJpbmcoKTtcbiAgcmV0dXJuICcnICsgb2JqO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBvbkVycm9yKGU6IGFueSkge1xuICAvLyBUT0RPOiAobWlza28pOiBXZSBzZWVtIHRvIG5vdCBoYXZlIGEgc3RhY2sgdHJhY2UgaGVyZSFcbiAgY29uc29sZS5sb2coZSwgZS5zdGFjayk7XG4gIHRocm93IGU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb250cm9sbGVyS2V5KG5hbWU6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiAnJCcgKyBuYW1lICsgJ0NvbnRyb2xsZXInO1xufVxuIl19