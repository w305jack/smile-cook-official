<template>
<div class="col-12">
  <div class="input-group pt-3 pb-3">
    <div class="col ml-0">
      <nav aria-label="...">
        <ul class="pagination">
          <li class="page-item" :class="{ disabled: !pagination.has_prev }">
            <a class="page-link" @click.stop="onChangePage(pagination.prev_num)">Previous</a>
          </li>
          
          <li v-for="page in pagination.pages" class="page-item" :class="{ active: page === pagination.page}">
            <a v-if="page !== pagination.page" class="page-link" @click.stop="onChangePage(page)">{{page}}</a>
            <a v-if="page === pagination.page" class="page-link" >{{page}}</a>
          </li>

          <li class="page-item" :class="{ disabled: !pagination.has_next }">
            <a class="page-link" @click.stop="onChangePage(pagination.next_num)">Next</a>
          </li>
        </ul>
      </nav>
    </div>

    <div class="col-6 text-center pt-1">
      <p v-if="q != null" class="text-secondary">About <strong>{{pagination.total}}</strong> results for <strong>{{q}}</strong>.</p>
      <p v-if="q == null" class="text-secondary">The total of {{pagination.total}} recipes.</p>
    </div>

    <input v-model="inputItem.q" type="text" class="form-control" placeholder="hamburger" aria-label="hamburger" aria-describedby="button-addon2" id="inputQ">
    <div class="input-group-append mb-3 mr-3">
      <button @click.stop="search()" class="btn btn-outline-secondary" type="button" id="button-addon2">search</button>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ActionTypes } from '@/constant'
import { PaginationItem } from '@/response'

export interface InputItem {
  q: string | null
}

@Component
export default class SearchComponent extends Vue {
  inputItem = <InputItem>{
    q: null
  }

  q: string | null = null
  page: number = 1
  perPage: number = 10
  sort: string = 'created_at'
  order: string = 'desc'

  get pagination () : PaginationItem | null {
    try {
      return this.$store.state.pagination
    } catch (e) {
      return null
    }
  } 

  onChangePage (val : number) {
    this.page = val
    this.resetRecipeList()
  }

  onChangePerPage (val : number) {
    this.perPage = val
    this.resetRecipeList()
  }

  onChangeSort (val : string) {
    this.sort = val
    this.resetRecipeList()
  }

  onChangeOrder (val : string) {
    this.order = val
    this.resetRecipeList()
  }

  search () {
    this.q = this.inputItem.q
    if (this.inputItem.q !== null) {
      this.resetRecipeList()
    }
  }

  resetRecipeList () {
    debugger
    this.$store.dispatch(ActionTypes.GET_RECIPE_LIST, { q: this.q, page: this.page, perPage: this.perPage, sort: this.sort, order: this.order, visibility: 'public' }).then(() => {

    })
  }

  beforeMount () {
  }
}
</script>
