function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

class Table 
{
    constructor(rows, columns)
    {
        this.rows = rows;
        this.columns = columns;
        this.container = null;
        this.table = null;
        this.cursor = 0;

        // 5% padding on left and right
        this.paddingX = Math.round(this.rows * .1);
        // 10% padding on top and bottom
        this.paddingY = Math.round(this.rows * .1);
        // 1% line width
        this.lineWidth = Math.round(this.rows * .02);

        this.lineLengthX = this.paddingX * 2;
        this.lineLengthY = Math.round((this.rows - this.paddingY * 2) / 2);
    }

    render(container, id)
    {
        this.container = container;
        this.table = document.createElement("table");
        
        $(this.table).attr("id", id)
            .addClass("table");

        $(this.container).append(this.table);

        this.table = $('#display')[0];
        for (var y = 0; y < this.rows; y++)
        {
            this.appendRow(y, this.columns);
        }
        return this;
    }

    appendRow(y, columns)
    {
        var row = this.table.insertRow();

        for (var x = 0; x < this.columns; x++)
        {
            var cell = row.insertCell();
            $(cell)
                // .html(y + ":" + x)
                .attr("id", "table-cell-" + y + "-" + x)
                .addClass("table-cell");
        }
    }

    on(x, y)
    {
        $("#table-cell-" + y + "-" + x).addClass('table-cell-on');
        return this;
    }

    off(x, y)
    {
        $("#table-cell-" + y + "-" + x).removeClass('table-cell-on');
        return this;
    }

    print(str)
    {
        // reset the cursor to the start
        this.cursor = this.paddingX;

        for (var i = 0; i < str.length; i++)
        {
            var c = str[i];
            this.printChar(c);
        }

        return this;
    }

    printChar(c)
    {
        if ('0' == c) this.print0();
        else if ('1' == c) this.print1();
        else alert("ERROR: Character '" + c + "' not printable!");

        this.cursor += this.paddingX + this.lineLengthX;

        return this;
    }

    print1()
    {
        var cursor = this.cursor;

        // for (var x = 0; x < this.lineWidth; x++)
        // {
        //     for (var y = this.paddingY; y < this.rows - this.paddingY; y++)
        //     {
        //         this.on(cursor, y);
        //     }
        //     cursor++;
        // }

        this.drawTopLeft();
        this.drawTopRight();
        this.drawBottomLeft();
        this.drawBottomRight();
        this.drawHorizontalTop();
        this.drawHorizontalMiddle();
        this.drawHorizontalBottom();
    }

    drawVertical(xOffset)
    {
        var cursor = this.cursor + xOffset;

        for (var x = cursor; x < this.cursor + xOffset + this.lineWidth; x++)
        {
            for (var y = this.paddingY; y < this.lineLengthY + this.paddingY; y++)
            {
                this.on(cursor, y);
            }
            cursor++;
        }
    }

    drawTopLeft()
    {
        this.drawVertical(0);
    }

    drawTopRight()
    {
        this.drawVertical(this.lineLengthX);
    }

    drawBottom(xOffset)
    {
        var cursor = this.cursor + xOffset;

        for (var x = cursor; x < this.cursor + xOffset + this.lineWidth; x++)
        {
            for (var y = this.rows - this.paddingY; y > (this.rows - this.paddingY) - this.lineLengthY; y--)
            {
                this.on(cursor, y);
            }
            cursor++;
        }
    }

    drawBottomLeft()
    {
        this.drawBottom(0);
    }

    drawBottomRight()
    {
        this.drawBottom(this.lineLengthX);
    }

    drawHorizontal(yOffset)
    {
        for (var x = this.cursor + this.lineWidth + 1; x < this.cursor + this.lineLengthX - 1; x++)
        {
            for (var y = this.paddingY + yOffset - 1; y < this.paddingY + yOffset + this.lineWidth - 1; y++)
            {
                this.on(x, y);
            }
        }        
    }

    drawHorizontalTop()
    {
        this.drawHorizontal(0);
    }

    drawHorizontalMiddle()
    {
        this.drawHorizontal(this.lineLengthY);
    }

    drawHorizontalBottom()
    {
        this.drawHorizontal(this.lineLengthY * 2);
    }

    print0()
    {
    }
}

$(function() {
    var rows = 150;
    var columns = 300;
    var table = new Table(rows, columns)
        .render('#content', 'display');

    table.print("11");

    for (i = 0; i < 100; i++)
    {
        // table.on(getRandomInt(0, columns-1), getRandomInt(0, rows-1));
    }
});