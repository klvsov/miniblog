import {Component} from '../core/component';
import {apiService} from '../services/api.service';
import {renderPost} from '../templates/post.template';

export class FavouriteComponent extends Component {
    constructor(id, options) {
        super(id);

        this.loader = options.loader;
    }

    init() {
        this.$el.addEventListener('click', linkClickHandler.bind(this));
    }

    onShow() {
        const favourites = JSON.parse(localStorage.getItem('favourites'));
        const html = renderList(favourites);
        this.$el.insertAdjacentHTML('afterbegin', html);
    }

    onHide() {
        this.$el.innerHTML = '';
    }
}

async function linkClickHandler(event) {
    event.preventDefault();

    if(event.target.classList.contains('js-link')){
        const postId = event.target.dataset.id;
        console.log(postId)
        this.$el.innerHTML = '';
        this.loader.show();
        const post = await apiService.fetchPostById(postId);
        this.loader.hide();

        this.$el.insertAdjacentHTML('afterbegin', renderPost(post, {withButton: false}));
    }
}

function renderList(list = []) {
    if(list && list.length) {
        console.log(list)
        return `
        <ul>
            ${list.map(item => `<li><a href="#" class="js-link" data-id="${item.id}">${item.title}</a></li>`).join(' ')}
        </ul>
        `
    }

    return `<p class="center">Favourites list is empty</p>`;
}