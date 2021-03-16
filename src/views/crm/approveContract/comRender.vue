<script>
export default {
    name: 'comRender',
    functional: true,
    props: {
        scope: Object,
        render: Function
    },
    render: (h, ctx) => {
        return ctx.props.render ? ctx.props.render(ctx.props.scope) : '' // VNode
    }
}
</script>
