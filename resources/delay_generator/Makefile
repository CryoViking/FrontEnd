########################################################################
####################### Makefile Template ##############################
########################################################################

# Compiler settings - Can be customized.
CC = gcc
CXXFLAGS = -Wall -lm
LDFLAGS =

# Makefile settings - Can be customized.
APPNAME = delay_generator
EXT = .c
SRCDIR = ./src
LIBDIR = ./src/libs
OBJDIR = ./obj/
BLDDIR = ./build/

############## Do not change anything from here downwards! #############
SRC = $(wildcard $(SRCDIR)/*$(EXT))
OBJ = $(SRC:$(SRCDIR)/%.c=$(OBJDIR)/%.o)
DEP = $(OBJ:$(OBJDIR)/%.o=%.d)
# UNIX-based OS variables & settings
RM = rm
DELOBJ = $(OBJ)
# Windows OS variables & settings
DEL = del
EXE = .exe
WDELOBJ = $(SRC:$(SRCDIR)/%$(EXT)=$(OBJDIR)\\%.o)

########################################################################
####################### Targets beginning here #########################
########################################################################

all: $(BLDDIR)delay_generator

$(BLDDIR)delay_generator: $(OBJDIR)delay_generator.o $(BLDDIR) $(OBJDIR)
	$(CC) -o $@ ./src/main.c $< $(CXXFLAGS)

$(OBJDIR)delay_generator.o: ./src/delay_generator.c ./src/delay_generator.h $(BLDDIR) $(OBJDIR)
	$(CC) -c -o $@ $< $(CXXFLAGS)

$(OBJDIR):
	mkdir $@

$(BLDDIR):
	mkdir $@

clean:
	$(RM) $(wildcard ./obj/*.o ./obj/libs/*.o ./build/*)
