<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Models\Product;
use App\Models\Review;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Категории
        $categories = [
            ['name' => 'Курзе', 'slug' => 'kurze', 'icon' => 'UtensilsCrossed', 'description' => 'Дагестанские пельмени с разными начинками', 'sort_order' => 1],
            ['name' => 'Чуду', 'slug' => 'chudu', 'icon' => 'Cookie', 'description' => 'Тонкие пироги с начинкой', 'sort_order' => 2],
            ['name' => 'Хинкал', 'slug' => 'hinkal', 'icon' => 'ChefHat', 'description' => 'Традиционное дагестанское блюдо', 'sort_order' => 3],
            ['name' => 'Кондитерские изделия', 'slug' => 'konditerka', 'icon' => 'Cake', 'description' => 'Халяль сладости и выпечка', 'sort_order' => 4],
            ['name' => 'Замороженные полуфабрикаты', 'slug' => 'frozen', 'icon' => 'Snowflake', 'description' => 'Готовые блюда быстрой заморозки', 'sort_order' => 5],
            ['name' => 'Напитки', 'slug' => 'drinks', 'icon' => 'GlassWater', 'description' => 'Компоты, морсы и другие напитки', 'sort_order' => 6],
        ];

        foreach ($categories as $cat) {
            Category::create($cat);
        }

        // Продукты
        $products = [
            // Курзе
            ['category_id' => 1, 'name' => 'Курзе с мясом', 'slug' => 'kurze-s-myasom', 'description' => 'Классические дагестанские пельмени с бараниной', 'price' => 450, 'old_price' => 520, 'weight' => '500г', 'is_popular' => true, 'stock' => 50],
            ['category_id' => 1, 'name' => 'Курзе с творогом', 'slug' => 'kurze-s-tvorogom', 'description' => 'Нежные курзе с домашним творогом и зеленью', 'price' => 380, 'weight' => '500г', 'stock' => 30],
            ['category_id' => 1, 'name' => 'Курзе с картошкой', 'slug' => 'kurze-s-kartoshkoy', 'description' => 'Курзе с картофельной начинкой и луком', 'price' => 350, 'weight' => '500г', 'stock' => 40],
            ['category_id' => 1, 'name' => 'Курзе с тыквой', 'slug' => 'kurze-s-tykvoy', 'description' => 'Сезонные курзе с тыквенной начинкой', 'price' => 380, 'weight' => '500г', 'is_new' => true, 'stock' => 25],

            // Чуду
            ['category_id' => 2, 'name' => 'Чуду с мясом', 'slug' => 'chudu-s-myasom', 'description' => 'Тонкий пирог с бараниной и зеленью', 'price' => 320, 'weight' => '400г', 'is_popular' => true, 'stock' => 35],
            ['category_id' => 2, 'name' => 'Чуду с зеленью', 'slug' => 'chudu-s-zelenyu', 'description' => 'Вегетарианское чуду с горной зеленью', 'price' => 280, 'weight' => '350г', 'stock' => 40],
            ['category_id' => 2, 'name' => 'Чуду с тыквой', 'slug' => 'chudu-s-tykvoy', 'description' => 'Сладкое чуду с тыквой и орехами', 'price' => 300, 'weight' => '380г', 'stock' => 30],

            // Хинкал
            ['category_id' => 3, 'name' => 'Аварский хинкал', 'slug' => 'avarskiy-hinkal', 'description' => 'Крупные куски теста с бульоном и мясом', 'price' => 550, 'old_price' => 650, 'weight' => '700г', 'is_popular' => true, 'stock' => 20],
            ['category_id' => 3, 'name' => 'Даргинский хинкал', 'slug' => 'darginskiy-hinkal', 'description' => 'Мелкие тестяные шарики с мясным соусом', 'price' => 520, 'weight' => '650г', 'stock' => 25],
            ['category_id' => 3, 'name' => 'Лакский хинкал', 'slug' => 'lakskiy-hinkal', 'description' => 'Тонкие пласты теста с мясом и бульоном', 'price' => 530, 'weight' => '680г', 'is_new' => true, 'stock' => 15],

            // Кондитерка
            ['category_id' => 4, 'name' => 'Пахлава медовая', 'slug' => 'pahlava-medovaya', 'description' => 'Слоёная пахлава с грецким орехом и мёдом', 'price' => 680, 'old_price' => 780, 'weight' => '500г', 'is_popular' => true, 'stock' => 20],
            ['category_id' => 4, 'name' => 'Урбеч ассорти', 'slug' => 'urbech-assorti', 'description' => 'Набор из 3 видов натурального урбеча', 'price' => 890, 'weight' => '600г', 'stock' => 15],
            ['category_id' => 4, 'name' => 'Халва дагестанская', 'slug' => 'halva-dagestanskaya', 'description' => 'Домашняя халва из муки и мёда', 'price' => 420, 'weight' => '400г', 'stock' => 30],

            // Замороженные
            ['category_id' => 5, 'name' => 'Манты с бараниной', 'slug' => 'manty-s-baraninoy', 'description' => 'Крупные манты ручной лепки', 'price' => 480, 'weight' => '500г', 'stock' => 25],
            ['category_id' => 5, 'name' => 'Долма виноградная', 'slug' => 'dolma-vinogradnaya', 'description' => 'Долма в виноградных листьях с бараниной', 'price' => 520, 'weight' => '450г', 'is_popular' => true, 'stock' => 20],

            // Напитки
            ['category_id' => 6, 'name' => 'Компот из кураги', 'slug' => 'kompot-iz-kuragi', 'description' => 'Натуральный компот из горной кураги', 'price' => 180, 'weight' => '1л', 'stock' => 50],
            ['category_id' => 6, 'name' => 'Шербет фруктовый', 'slug' => 'sherbet-fruktovyy', 'description' => 'Охлаждающий шербет с горными ягодами', 'price' => 220, 'weight' => '1л', 'is_new' => true, 'stock' => 35],
        ];

        foreach ($products as $product) {
            Product::create(array_merge($product, ['is_halal' => true, 'is_active' => true]));
        }

        // Отзывы
        $reviews = [
            ['author_name' => 'Мадина К.', 'author_role' => 'Постоянный клиент', 'content' => 'Курзе как у бабушки в ауле! Тесто тоненькое, мяса много. Заказываю каждую неделю на семью, дети обожают. Доставка всегда вовремя, горячее.', 'rating' => 5, 'is_published' => true, 'product_id' => 1],
            ['author_name' => 'Ахмед Г.', 'author_role' => 'Ресторатор', 'content' => 'Для своего кафе заказываю полуфабрикаты оптом. Качество стабильное, все халяль сертифицировано. Хинкал — вообще бомба, гости в восторге!', 'rating' => 5, 'is_published' => true, 'product_id' => 8],
            ['author_name' => 'Патимат М.', 'author_role' => 'Мама троих детей', 'content' => 'Спасибо, что есть такой сервис! Работаю допоздна, а дома всегда есть вкусный и халяль ужин. Пахлава — это отдельная песня, тает во рту!', 'rating' => 5, 'is_published' => true, 'product_id' => 11],
            ['author_name' => 'Расул А.', 'author_role' => 'Предприниматель', 'content' => 'Живу в Москве, скучаю по домашней кухне. Эти ребята делают всё по-настоящему, вкус Дагестана в каждом блюде. Доставка по Москве — супер!', 'rating' => 4, 'is_published' => true],
            ['author_name' => 'Зарема Ш.', 'author_role' => 'Домохозяйка', 'content' => 'Чуду с зеленью — невероятное! Тонкое, с хрустящей корочкой. А урбеч — натуральный, без добавок. Чувствуется, что делают с душой.', 'rating' => 5, 'is_published' => true, 'product_id' => 6],
            ['author_name' => 'Магомед И.', 'author_role' => 'Спортсмен', 'content' => 'Важно, что всё халяль и натуральное. Никакой химии. Манты огромные и сочные. Рекомендую всем, кто ценит настоящую кавказскую кухню!', 'rating' => 5, 'is_published' => true, 'product_id' => 14],
        ];

        foreach ($reviews as $review) {
            Review::create($review);
        }
    }
}