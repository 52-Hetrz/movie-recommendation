# movie-recommendation

A Spring Boot-based movie recommendation system that allows users to browse movies, leave reviews, and receive personalized movie suggestions based on their preferences.

## 🚀 Features

- **User Management**: User registration, login, and password management.
- **Movie Discovery**: Search movies by name or type, browse hot movies, and view movies by classification.
- **Interactive Reviews**: Users can rate movies and write comments. The system automatically recalculates and updates movie scores based on user reviews.
- **Personalized Recommendations**: Integrates **Apache Mahout** using the `SlopeOne` algorithm to provide movie recommendations tailored to individual users.
- **Administrative Dashboard**: Comprehensive management tools for administrators to:
    - Manage movie listings (Insert, Update, Delete).
    - Moderate user comments.
    - Manage registered users.
- **Collections**: Ability for users to save movies to a personal collection.

## 🛠 Tech Stack

- **Backend**: Java 8, Spring Boot 2.1.15
- **Database**: MySQL (using MyBatis for data persistence)
- **Recommendation Engine**: Apache Mahout (Slope One)
- **Frontend Templates**: Thymeleaf
- **Build Tool**: Maven

## ⚙️ Installation

### Prerequisites
- Java JDK 1.8
- Maven
- MySQL Server

### Database Setup
1. Create a MySQL database named `movie`.
2. Ensure your database credentials match those configured in `src/main/java/com/example/demo/model/MyDataModel.java` (or update the configuration file to match your environment):
   - **User**: `root`
   - **Password**: `121982`
   - **Database**: `movie`

### Build and Run
1. Clone the repository:
   ```bash
   git clone https://github.com/52-Hetrz/movie-recommendation.git
   ```
2. Navigate to the project directory:
   ```bash
   cd movie-recommendation
   ```
3. Build the project using Maven:
   ```bash
   mvn clean install
   ```
4. Run the application:
   ```bash
   mvn spring-boot:run
   ```

## 📖 Usage

Once the application is running, you can access the following main pages via your browser:

- **Home Page**: `/index`
- **Movie Classifications**: `/classify`
- **User Profile/Dashboard**: `/userPage`
- **Search Page**: `/searchpage`
- **Administrator Login**: `/administratorpage`

### API Highlights
- `GET /login`: Authenticate a user and retrieve recommendations.
- `POST /insertComment`: Submit a movie rating and review.
- `GET /fuzzySearchMovieByName?name=...`: Search for movies by name.
- `POST /administrator/insertMovie`: (Admin only) Add a new movie to the library.
