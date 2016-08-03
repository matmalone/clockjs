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
        this.reset();

        for (var i = 0; i < str.length; i++)
        {
            var c = str[i];
            this.printChar(c);
        }

        return this;
    }

    reset()
    {
        // reset the cursor to the start
        this.cursor = this.paddingX;

        // turn all the table cells off
        $(".table-cell").removeClass('table-cell-on');
        return this;
    }

    printChar(c)
    {
        if ('0' == c) this.print0();
        else if ('1' == c) this.print1();
        else if ('2' == c) this.print2();
        else if ('3' == c) this.print3();
        else if ('4' == c) this.print4();
        else if ('5' == c) this.print5();
        else if ('6' == c) this.print6();
        else if ('7' == c) this.print7();
        else if ('8' == c) this.print8();
        else if ('9' == c) this.print9();
        else alert("ERROR: Character '" + c + "' not printable!");

        this.cursor += this.paddingX + this.lineLengthX;

        return this;
    }

    print0()
    {
        this.drawTopLeft();
        this.drawTopRight();
        this.drawBottomLeft();
        this.drawBottomRight();
        this.drawHorizontalTop();
        this.drawHorizontalBottom();
    }

    print1()
    {
        this.drawTopRight();
        this.drawBottomRight();
    }

    print2()
    {
        this.drawTopRight();
        this.drawBottomLeft();
        this.drawHorizontalTop();
        this.drawHorizontalMiddle();
        this.drawHorizontalBottom();
    }

    print3()
    {
        this.drawTopRight();
        this.drawBottomRight();
        this.drawHorizontalTop();
        this.drawHorizontalMiddle();
        this.drawHorizontalBottom();
    }

    print4()
    {
        this.drawTopLeft();
        this.drawTopRight();
        this.drawBottomRight();
        this.drawHorizontalMiddle();
    }

    print5()
    {
        this.drawTopLeft();
        this.drawBottomRight();
        this.drawHorizontalTop();
        this.drawHorizontalMiddle();
        this.drawHorizontalBottom();
    }

    print6()
    {
        this.drawTopLeft();
        this.drawBottomLeft();
        this.drawBottomRight();
        this.drawHorizontalTop();
        this.drawHorizontalMiddle();
        this.drawHorizontalBottom();
    }

    print7()
    {
        this.drawTopRight();
        this.drawBottomRight();
        this.drawHorizontalTop();
    }

    print8()
    {
        this.drawTopLeft();
        this.drawTopRight();
        this.drawBottomLeft();
        this.drawBottomRight();
        this.drawHorizontalTop();
        this.drawHorizontalMiddle();
        this.drawHorizontalBottom();
    }

    print9()
    {
        this.drawTopLeft();
        this.drawTopRight();
        this.drawBottomRight();
        this.drawHorizontalTop();
        this.drawHorizontalMiddle();
        this.drawHorizontalBottom();
    }

    drawVertical(xOffset)
    {
        for (var x = this.cursor + xOffset; x < this.cursor + xOffset + this.lineWidth; x++)
        {
            for (var y = this.paddingY; y < this.lineLengthY + this.paddingY; y++)
            {
                this.on(x, y);
            }
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
        for (var x = this.cursor + xOffset; x < this.cursor + xOffset + this.lineWidth; x++)
        {
            for (var y = this.rows - this.paddingY; y > (this.rows - this.paddingY) - this.lineLengthY; y--)
            {
                this.on(x, y);
            }
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
}

$(function() {
    var rows = 100;
    var columns = 200;
    var table = new Table(rows, columns)
        .render('#content', 'display');


    window.setInterval(function() {
        var time = moment().format('HHmmss')
        table.print(time);
    }, 1000);
});
