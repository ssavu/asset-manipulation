/* */ 
"format cjs";
'use strict';"use strict";
var ParseLocation = (function () {
    function ParseLocation(file, offset, line, col) {
        this.file = file;
        this.offset = offset;
        this.line = line;
        this.col = col;
    }
    ParseLocation.prototype.toString = function () { return this.file.url + "@" + this.line + ":" + this.col; };
    return ParseLocation;
}());
exports.ParseLocation = ParseLocation;
var ParseSourceFile = (function () {
    function ParseSourceFile(content, url) {
        this.content = content;
        this.url = url;
    }
    return ParseSourceFile;
}());
exports.ParseSourceFile = ParseSourceFile;
var ParseSourceSpan = (function () {
    function ParseSourceSpan(start, end) {
        this.start = start;
        this.end = end;
    }
    ParseSourceSpan.prototype.toString = function () {
        return this.start.file.content.substring(this.start.offset, this.end.offset);
    };
    return ParseSourceSpan;
}());
exports.ParseSourceSpan = ParseSourceSpan;
var ParseError = (function () {
    function ParseError(span, msg) {
        this.span = span;
        this.msg = msg;
    }
    ParseError.prototype.toString = function () {
        var source = this.span.start.file.content;
        var ctxStart = this.span.start.offset;
        if (ctxStart > source.length - 1) {
            ctxStart = source.length - 1;
        }
        var ctxEnd = ctxStart;
        var ctxLen = 0;
        var ctxLines = 0;
        while (ctxLen < 100 && ctxStart > 0) {
            ctxStart--;
            ctxLen++;
            if (source[ctxStart] == "\n") {
                if (++ctxLines == 3) {
                    break;
                }
            }
        }
        ctxLen = 0;
        ctxLines = 0;
        while (ctxLen < 100 && ctxEnd < source.length - 1) {
            ctxEnd++;
            ctxLen++;
            if (source[ctxEnd] == "\n") {
                if (++ctxLines == 3) {
                    break;
                }
            }
        }
        var context = source.substring(ctxStart, this.span.start.offset) + '[ERROR ->]' +
            source.substring(this.span.start.offset, ctxEnd + 1);
        return this.msg + " (\"" + context + "\"): " + this.span.start;
    };
    return ParseError;
}());
exports.ParseError = ParseError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VfdXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRpZmZpbmdfcGx1Z2luX3dyYXBwZXItb3V0cHV0X3BhdGgtNG5vM1pRdk8udG1wL2FuZ3VsYXIyL3NyYy9jb21waWxlci9wYXJzZV91dGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtJQUNFLHVCQUFtQixJQUFxQixFQUFTLE1BQWMsRUFBUyxJQUFZLEVBQ2pFLEdBQVc7UUFEWCxTQUFJLEdBQUosSUFBSSxDQUFpQjtRQUFTLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBUyxTQUFJLEdBQUosSUFBSSxDQUFRO1FBQ2pFLFFBQUcsR0FBSCxHQUFHLENBQVE7SUFBRyxDQUFDO0lBRWxDLGdDQUFRLEdBQVIsY0FBcUIsTUFBTSxDQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxTQUFJLElBQUksQ0FBQyxJQUFJLFNBQUksSUFBSSxDQUFDLEdBQUssQ0FBQyxDQUFDLENBQUM7SUFDNUUsb0JBQUM7QUFBRCxDQUFDLEFBTEQsSUFLQztBQUxZLHFCQUFhLGdCQUt6QixDQUFBO0FBRUQ7SUFDRSx5QkFBbUIsT0FBZSxFQUFTLEdBQVc7UUFBbkMsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUFTLFFBQUcsR0FBSCxHQUFHLENBQVE7SUFBRyxDQUFDO0lBQzVELHNCQUFDO0FBQUQsQ0FBQyxBQUZELElBRUM7QUFGWSx1QkFBZSxrQkFFM0IsQ0FBQTtBQUVEO0lBQ0UseUJBQW1CLEtBQW9CLEVBQVMsR0FBa0I7UUFBL0MsVUFBSyxHQUFMLEtBQUssQ0FBZTtRQUFTLFFBQUcsR0FBSCxHQUFHLENBQWU7SUFBRyxDQUFDO0lBRXRFLGtDQUFRLEdBQVI7UUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQy9FLENBQUM7SUFDSCxzQkFBQztBQUFELENBQUMsQUFORCxJQU1DO0FBTlksdUJBQWUsa0JBTTNCLENBQUE7QUFFRDtJQUNFLG9CQUFtQixJQUFxQixFQUFTLEdBQVc7UUFBekMsU0FBSSxHQUFKLElBQUksQ0FBaUI7UUFBUyxRQUFHLEdBQUgsR0FBRyxDQUFRO0lBQUcsQ0FBQztJQUVoRSw2QkFBUSxHQUFSO1FBQ0UsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUMxQyxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7UUFDdEMsRUFBRSxDQUFDLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNqQyxRQUFRLEdBQUcsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDL0IsQ0FBQztRQUNELElBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQztRQUN0QixJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDZixJQUFJLFFBQVEsR0FBRyxDQUFDLENBQUM7UUFFakIsT0FBTyxNQUFNLEdBQUcsR0FBRyxJQUFJLFFBQVEsR0FBRyxDQUFDLEVBQUUsQ0FBQztZQUNwQyxRQUFRLEVBQUUsQ0FBQztZQUNYLE1BQU0sRUFBRSxDQUFDO1lBQ1QsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQzdCLEVBQUUsQ0FBQyxDQUFDLEVBQUUsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3BCLEtBQUssQ0FBQztnQkFDUixDQUFDO1lBQ0gsQ0FBQztRQUNILENBQUM7UUFFRCxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ1gsUUFBUSxHQUFHLENBQUMsQ0FBQztRQUNiLE9BQU8sTUFBTSxHQUFHLEdBQUcsSUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQztZQUNsRCxNQUFNLEVBQUUsQ0FBQztZQUNULE1BQU0sRUFBRSxDQUFDO1lBQ1QsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQzNCLEVBQUUsQ0FBQyxDQUFDLEVBQUUsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3BCLEtBQUssQ0FBQztnQkFDUixDQUFDO1lBQ0gsQ0FBQztRQUNILENBQUM7UUFFRCxJQUFJLE9BQU8sR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxZQUFZO1lBQ2pFLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztRQUVuRSxNQUFNLENBQUksSUFBSSxDQUFDLEdBQUcsWUFBTSxPQUFPLGFBQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFPLENBQUM7SUFDMUQsQ0FBQztJQUNILGlCQUFDO0FBQUQsQ0FBQyxBQXhDRCxJQXdDQztBQXhDcUIsa0JBQVUsYUF3Qy9CLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgUGFyc2VMb2NhdGlvbiB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBmaWxlOiBQYXJzZVNvdXJjZUZpbGUsIHB1YmxpYyBvZmZzZXQ6IG51bWJlciwgcHVibGljIGxpbmU6IG51bWJlcixcbiAgICAgICAgICAgICAgcHVibGljIGNvbDogbnVtYmVyKSB7fVxuXG4gIHRvU3RyaW5nKCk6IHN0cmluZyB7IHJldHVybiBgJHt0aGlzLmZpbGUudXJsfUAke3RoaXMubGluZX06JHt0aGlzLmNvbH1gOyB9XG59XG5cbmV4cG9ydCBjbGFzcyBQYXJzZVNvdXJjZUZpbGUge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgY29udGVudDogc3RyaW5nLCBwdWJsaWMgdXJsOiBzdHJpbmcpIHt9XG59XG5cbmV4cG9ydCBjbGFzcyBQYXJzZVNvdXJjZVNwYW4ge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgc3RhcnQ6IFBhcnNlTG9jYXRpb24sIHB1YmxpYyBlbmQ6IFBhcnNlTG9jYXRpb24pIHt9XG5cbiAgdG9TdHJpbmcoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5zdGFydC5maWxlLmNvbnRlbnQuc3Vic3RyaW5nKHRoaXMuc3RhcnQub2Zmc2V0LCB0aGlzLmVuZC5vZmZzZXQpO1xuICB9XG59XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBQYXJzZUVycm9yIHtcbiAgY29uc3RydWN0b3IocHVibGljIHNwYW46IFBhcnNlU291cmNlU3BhbiwgcHVibGljIG1zZzogc3RyaW5nKSB7fVxuXG4gIHRvU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgdmFyIHNvdXJjZSA9IHRoaXMuc3Bhbi5zdGFydC5maWxlLmNvbnRlbnQ7XG4gICAgdmFyIGN0eFN0YXJ0ID0gdGhpcy5zcGFuLnN0YXJ0Lm9mZnNldDtcbiAgICBpZiAoY3R4U3RhcnQgPiBzb3VyY2UubGVuZ3RoIC0gMSkge1xuICAgICAgY3R4U3RhcnQgPSBzb3VyY2UubGVuZ3RoIC0gMTtcbiAgICB9XG4gICAgdmFyIGN0eEVuZCA9IGN0eFN0YXJ0O1xuICAgIHZhciBjdHhMZW4gPSAwO1xuICAgIHZhciBjdHhMaW5lcyA9IDA7XG5cbiAgICB3aGlsZSAoY3R4TGVuIDwgMTAwICYmIGN0eFN0YXJ0ID4gMCkge1xuICAgICAgY3R4U3RhcnQtLTtcbiAgICAgIGN0eExlbisrO1xuICAgICAgaWYgKHNvdXJjZVtjdHhTdGFydF0gPT0gXCJcXG5cIikge1xuICAgICAgICBpZiAoKytjdHhMaW5lcyA9PSAzKSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBjdHhMZW4gPSAwO1xuICAgIGN0eExpbmVzID0gMDtcbiAgICB3aGlsZSAoY3R4TGVuIDwgMTAwICYmIGN0eEVuZCA8IHNvdXJjZS5sZW5ndGggLSAxKSB7XG4gICAgICBjdHhFbmQrKztcbiAgICAgIGN0eExlbisrO1xuICAgICAgaWYgKHNvdXJjZVtjdHhFbmRdID09IFwiXFxuXCIpIHtcbiAgICAgICAgaWYgKCsrY3R4TGluZXMgPT0gMykge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IGNvbnRleHQgPSBzb3VyY2Uuc3Vic3RyaW5nKGN0eFN0YXJ0LCB0aGlzLnNwYW4uc3RhcnQub2Zmc2V0KSArICdbRVJST1IgLT5dJyArXG4gICAgICAgICAgICAgICAgICBzb3VyY2Uuc3Vic3RyaW5nKHRoaXMuc3Bhbi5zdGFydC5vZmZzZXQsIGN0eEVuZCArIDEpO1xuXG4gICAgcmV0dXJuIGAke3RoaXMubXNnfSAoXCIke2NvbnRleHR9XCIpOiAke3RoaXMuc3Bhbi5zdGFydH1gO1xuICB9XG59XG4iXX0=