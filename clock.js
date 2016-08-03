class Table 
{
    constructor(rows, columns)
    {
        this.rows = rows;
        this.columns = columns;
        this.container = null;
        this.table = null;
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
    }
}

$(function() {
    var table = new Table(200, 200)
        .render('#content', 'display');
    
    table.on(3, 3);
    table.off(3, 3);
});