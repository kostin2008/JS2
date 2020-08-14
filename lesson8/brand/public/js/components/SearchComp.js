Vue.component('app-search', {
	data() {
		return {
			filterData: ''
		}
	},

	template: `
		<form class="form-top" action="#"
			@submit.prevent="$parent.$refs.appCatalog.filter(filterData)">
			<input class="text-find" type="text" placeholder="Search for Item..." v-model="filterData">
			<button class="btn-find" type="submit"></button>
		</form>`
});
				
