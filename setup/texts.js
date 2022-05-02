let E = process.env;

let txt = {
    start: {
        world: {
        friend: 'Hello world, <%=name%>!',
        bye: 'Good bye, <%=name%>',
            message: '<%=render("hello.world.friend")%> <%=render("hello.world.bye")%>'
        }
    }
}

function settexts () {
    Object.assign(global, {
        $t: txt
    })
}

exports.settexts = settexts;