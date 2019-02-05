module.exports = (items) => items && `<script type="text/javascript">
    ${Object.keys(items).map(key => `window['${key}'] = ${items[key]};`).join('\n')}
</script>`;
